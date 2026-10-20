import { form, get, post, route } from 'remix/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: '/',
  projects: {
    index: get('/projects'),
    new: form('/projects/new'),
    show: get('/projects/:projectId'),
    edit: form('/projects/:projectId/edit'),
    destroy: post('/projects/:projectId/delete'),
  },
  albums: {
    show: get('/albums/:albumId'),
    edit: form('/albums/:albumId/edit')
  },
})
