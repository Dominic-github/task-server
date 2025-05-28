import { StatusCodes, ReasonPhrases } from '@/constants/http'
import { Response } from 'express'

export class BaseError extends Error {
  status: StatusCodes
  errors: Array<any>
  data: any
  isOperational: any
  constructor(
    message: string,
    status: StatusCodes,
    errors: Array<any>,
    isOperational: boolean
  ) {
    super(message)
    // Object.setPrototypeOf(this, new.target.prototype)
    this.status = status
    this.errors = errors
    this.isOperational = isOperational
    // Error.captureStackTrace(this, this.constructor)
  }

  static handle(error: unknown, res: Response) {
    if (error instanceof BaseError) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
        data: error.data,
        statusCode: error.status,
        errors: error.errors
      })
    }

    console.error('Unhandled error:', error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    })
  }
}

export class Api409Error extends BaseError {
  constructor(
    message: string = ReasonPhrases.CONFLICT,
    errors = [],
    status = StatusCodes.CONFLICT,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}

export class Api403Error extends BaseError {
  constructor(
    message: string = ReasonPhrases.FORBIDDEN,
    errors = [],
    status = StatusCodes.FORBIDDEN,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}

export class Api401Error extends BaseError {
  constructor(
    message: string = ReasonPhrases.UNAUTHORIZED,
    errors = [],
    status = StatusCodes.UNAUTHORIZED,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}

export class BusinessLogicError extends BaseError {
  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    errors = [],
    status = StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}

export class Api404Error extends BaseError {
  constructor(
    message: string = ReasonPhrases.NOT_FOUND,
    errors = [],
    status = StatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(message, status, errors, isOperational)
  }
}
