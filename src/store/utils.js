import { of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

export const handleError = fn => catchError(e => of(fn({ error: e || e.message })))
export const toPayload = map(action => action.payload)
