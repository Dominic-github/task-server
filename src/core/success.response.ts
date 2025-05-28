import { StatusCodes } from '@/constants/http'
import { Response } from 'express'

class SuccessResponse {
  message: string
  success!: boolean
  status: number
  data: object
  options: object
  isOperational: any

  constructor(
    message: string,
    status = StatusCodes.OK,
    data = {},
    options = {}
  ) {
    this.message = message
    this.status = status
    this.data = data
    this.options = options
  }

  send(res: Response) {
    this.success = true
    return res.status(this.status).json(this)
  }
}

// GET
class Ok extends SuccessResponse {
  constructor(message: string, data: object, options: object = {}) {
    const status: number = StatusCodes.OK
    super(message, status, data, options)
  }
}

// POST
class Created extends SuccessResponse {
  constructor(message: string, data = {}, options = {}) {
    const status: number = StatusCodes.CREATED
    super(message, status, data, options)
  }
}

// PATCH/PUT Updated (200)
class Updated extends SuccessResponse {
  constructor(message: string, data = {}, options = {}) {
    const status: number = StatusCodes.OK
    super(message, status, data, options)
  }
}

export const OK = (
  res: Response,
  message: string,
  data: object,
  options = {}
) => {
  new Ok(message, data, options).send(res)
}

export const CREATED = (
  res: Response,
  message: string,
  data: object,
  options = {}
) => {
  new Created(message, data, options).send(res)
}

export const UPDATED = (
  res: Response,
  message: string,
  data: object,
  options = {}
) => {
  new Updated(message, data, options).send(res)
}
