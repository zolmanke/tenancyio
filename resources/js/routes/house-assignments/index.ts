import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\HouseAssignmentController::create
 * @see app/Http/Controllers/HouseAssignmentController.php:16
 * @route '/house-assignments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/house-assignments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::create
 * @see app/Http/Controllers/HouseAssignmentController.php:16
 * @route '/house-assignments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::create
 * @see app/Http/Controllers/HouseAssignmentController.php:16
 * @route '/house-assignments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HouseAssignmentController::create
 * @see app/Http/Controllers/HouseAssignmentController.php:16
 * @route '/house-assignments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::create
 * @see app/Http/Controllers/HouseAssignmentController.php:16
 * @route '/house-assignments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::create
 * @see app/Http/Controllers/HouseAssignmentController.php:16
 * @route '/house-assignments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HouseAssignmentController::create
 * @see app/Http/Controllers/HouseAssignmentController.php:16
 * @route '/house-assignments/create'
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
* @see \App\Http\Controllers\HouseAssignmentController::store
 * @see app/Http/Controllers/HouseAssignmentController.php:63
 * @route '/house-assignments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/house-assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::store
 * @see app/Http/Controllers/HouseAssignmentController.php:63
 * @route '/house-assignments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::store
 * @see app/Http/Controllers/HouseAssignmentController.php:63
 * @route '/house-assignments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::store
 * @see app/Http/Controllers/HouseAssignmentController.php:63
 * @route '/house-assignments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::store
 * @see app/Http/Controllers/HouseAssignmentController.php:63
 * @route '/house-assignments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HouseAssignmentController::terminate
 * @see app/Http/Controllers/HouseAssignmentController.php:167
 * @route '/house-assignments/{assignment}/terminate'
 */
export const terminate = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: terminate.url(args, options),
    method: 'post',
})

terminate.definition = {
    methods: ["post"],
    url: '/house-assignments/{assignment}/terminate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::terminate
 * @see app/Http/Controllers/HouseAssignmentController.php:167
 * @route '/house-assignments/{assignment}/terminate'
 */
terminate.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return terminate.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::terminate
 * @see app/Http/Controllers/HouseAssignmentController.php:167
 * @route '/house-assignments/{assignment}/terminate'
 */
terminate.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: terminate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::terminate
 * @see app/Http/Controllers/HouseAssignmentController.php:167
 * @route '/house-assignments/{assignment}/terminate'
 */
    const terminateForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: terminate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::terminate
 * @see app/Http/Controllers/HouseAssignmentController.php:167
 * @route '/house-assignments/{assignment}/terminate'
 */
        terminateForm.post = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: terminate.url(args, options),
            method: 'post',
        })
    
    terminate.form = terminateForm
/**
* @see \App\Http\Controllers\HouseAssignmentController::destroy
 * @see app/Http/Controllers/HouseAssignmentController.php:207
 * @route '/house-assignments/{assignment}'
 */
export const destroy = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/house-assignments/{assignment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::destroy
 * @see app/Http/Controllers/HouseAssignmentController.php:207
 * @route '/house-assignments/{assignment}'
 */
destroy.url = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assignment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return destroy.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::destroy
 * @see app/Http/Controllers/HouseAssignmentController.php:207
 * @route '/house-assignments/{assignment}'
 */
destroy.delete = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::destroy
 * @see app/Http/Controllers/HouseAssignmentController.php:207
 * @route '/house-assignments/{assignment}'
 */
    const destroyForm = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::destroy
 * @see app/Http/Controllers/HouseAssignmentController.php:207
 * @route '/house-assignments/{assignment}'
 */
        destroyForm.delete = (args: { assignment: number | { id: number } } | [assignment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const houseAssignments = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
terminate: Object.assign(terminate, terminate),
destroy: Object.assign(destroy, destroy),
}

export default houseAssignments