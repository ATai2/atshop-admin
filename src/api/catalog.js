import nrequest from '@/utils/nrequest'

const prefix="http://localhost:8081"

export function getcatalogList(params) {
  return nrequest({
    url: prefix+'/getCatalog1',
    method: 'get',
    params
  })
}
