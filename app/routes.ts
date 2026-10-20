import { form, get, route } from 'remix/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: '/',
  projects: {
    index: get('/projects'),
    show: get('/projects/:projectId'),
  },
  albums: {
    show: get('/albums/:albumId'),
    edit: form('/albums/:albumId/edit')
  },
})
