import * as assert from 'remix/assert'
import { beforeAll, describe, it } from 'remix/test'

import { migrateDatabase } from '../../db.ts'
import { router } from '../../router.ts'
import { routes } from '../../routes.ts'

const origin = 'http://localhost'

function post(path: string, fields: Record<string, string>) {
  return router.fetch(
    new Request(new URL(path, origin), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(fields),
    }),
  )
}

async function createProject(name: string) {
  let response = await post(routes.projects.new.index.href(), {
    name,
    description: 'desc',
    status: 'planned',
  })
  assert.equal(response.status, 303)
  return response.headers.get('Location')!
}

describe('projects', () => {
  beforeAll(async () => {
    await migrateDatabase()
  })

  it('GET /projects lists projects', async () => {
    let location = await createProject('Listed project')
    let response = await router.fetch(new URL(routes.projects.index.href(), origin))

    assert.equal(response.status, 200)
    let html = await response.text()
    assert.match(html, /Listed project/)
    assert.match(html, new RegExp(location))
  })

  it('creates then shows a project', async () => {
    let location = await createProject('Shown project')
    let response = await router.fetch(new URL(location, origin))

    assert.equal(response.status, 200)
    assert.match(await response.text(), /Shown project/)
  })

  it('rejects invalid create input', async () => {
    let badStatus = await post(routes.projects.new.index.href(), { name: 'X', status: 'bogus' })
    let blankName = await post(routes.projects.new.index.href(), { name: '  ', status: 'done' })

    assert.equal(badStatus.status, 400)
    assert.equal(blankName.status, 400)
  })

  it('returns 404 for a missing project', async () => {
    let response = await router.fetch(
      new URL(routes.projects.show.href({ projectId: 'missing' }), origin),
    )
    assert.equal(response.status, 404)
  })

  it('edits a project', async () => {
    let location = await createProject('Before edit')
    let response = await post(`${location}/edit`, {
      name: 'After edit',
      description: 'changed',
      status: 'done',
    })

    assert.equal(response.status, 303)
    let page = await router.fetch(new URL(location, origin))
    let html = await page.text()
    assert.match(html, /After edit/)
    assert.match(html, /Status: done/)
  })

  it('rejects invalid edit input and missing projects', async () => {
    let location = await createProject('Edit target')
    let invalid = await post(`${location}/edit`, { name: '', status: 'done' })
    let missing = await post('/projects/missing/edit', { name: 'A', status: 'done' })

    assert.equal(invalid.status, 400)
    assert.equal(missing.status, 404)
  })

  it('deletes a project', async () => {
    let location = await createProject('To delete')
    let response = await post(`${location}/delete`, {})

    assert.equal(response.status, 303)
    assert.equal(response.headers.get('Location'), routes.projects.index.href())
    let page = await router.fetch(new URL(location, origin))
    assert.equal(page.status, 404)
    assert.equal((await post(`${location}/delete`, {})).status, 404)
  })
})
