import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\HouseController::create
 * @see app/Http/Controllers/HouseController.php:14
 * @route '/houses/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/houses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseController::create
 * @see app/Http/Controllers/HouseController.php:14
 * @route '/houses/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseController::create
 * @see app/Http/Controllers/HouseController.php:14
 * @route '/houses/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HouseController::create
 * @see app/Http/Controllers/HouseController.php:14
 * @route '/houses/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HouseController::create
 * @see app/Http/Controllers/HouseController.php:14
 * @route '/houses/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HouseController::create
 * @see app/Http/Controllers/HouseController.php:14
 * @route '/houses/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HouseController::create
 * @see app/Http/Controllers/HouseController.php:14
 * @route '/houses/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\HouseController::store
 * @see app/Http/Controllers/HouseController.php:29
 * @route '/houses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/houses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HouseController::store
 * @see app/Http/Controllers/HouseController.php:29
 * @route '/houses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseController::store
 * @see app/Http/Controllers/HouseController.php:29
 * @route '/houses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HouseController::store
 * @see app/Http/Controllers/HouseController.php:29
 * @route '/houses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HouseController::store
 * @see app/Http/Controllers/HouseController.php:29
 * @route '/houses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HouseAssignmentController::assignmentHistory
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
export const assignmentHistory = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assignmentHistory.url(args, options),
    method: 'get',
})

assignmentHistory.definition = {
    methods: ["get","head"],
    url: '/houses/{house}/assignment-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::assignmentHistory
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
assignmentHistory.url = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { house: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { house: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    house: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        house: typeof args.house === 'object'
                ? args.house.id
                : args.house,
                }

    return assignmentHistory.definition.url
            .replace('{house}', parsedArgs.house.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::assignmentHistory
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
assignmentHistory.get = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assignmentHistory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HouseAssignmentController::assignmentHistory
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
assignmentHistory.head = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assignmentHistory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::assignmentHistory
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
    const assignmentHistoryForm = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assignmentHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::assignmentHistory
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
        assignmentHistoryForm.get = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assignmentHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HouseAssignmentController::assignmentHistory
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
        assignmentHistoryForm.head = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assignmentHistory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assignmentHistory.form = assignmentHistoryForm
const houses = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
assignmentHistory: Object.assign(assignmentHistory, assignmentHistory),
}

export default houses