import { createApiKey } from '@/models/repository/apiKey.repo'

class ApiKeyService {
  createApiKey = async (permissions: Array<string>) => {
    return await createApiKey(permissions)
  }
}

export default new ApiKeyService()
