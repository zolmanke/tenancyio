import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\MaintenanceRequestController::index
 * @see app/Http/Controllers/MaintenanceRequestController.php:13
 * @route '/tenant/maintenance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tenant/maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceRequestController::index
 * @see app/Http/Controllers/MaintenanceRequestController.php:13
 * @route '/tenant/maintenance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceRequestController::index
 * @see app/Http/Controllers/MaintenanceRequestController.php:13
 * @route '/tenant/maintenance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceRequestController::index
 * @see app/Http/Controllers/MaintenanceRequestController.php:13
 * @route '/tenant/maintenance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceRequestController::index
 * @see app/Http/Controllers/MaintenanceRequestController.php:13
 * @route '/tenant/maintenance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceRequestController::index
 * @see app/Http/Controllers/MaintenanceRequestController.php:13
 * @route '/tenant/maintenance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceRequestController::index
 * @see app/Http/Controllers/MaintenanceRequestController.php:13
 * @route '/tenant/maintenance'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\MaintenanceRequestController::create
 * @see app/Http/Controllers/MaintenanceRequestController.php:34
 * @route '/tenant/maintenance/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tenant/maintenance/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MaintenanceRequestController::create
 * @see app/Http/Controllers/MaintenanceRequestController.php:34
 * @route '/tenant/maintenance/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceRequestController::create
 * @see app/Http/Controllers/MaintenanceRequestController.php:34
 * @route '/tenant/maintenance/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MaintenanceRequestController::create
 * @see app/Http/Controllers/MaintenanceRequestController.php:34
 * @route '/tenant/maintenance/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MaintenanceRequestController::create
 * @see app/Http/Controllers/MaintenanceRequestController.php:34
 * @route '/tenant/maintenance/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MaintenanceRequestController::create
 * @see app/Http/Controllers/MaintenanceRequestController.php:34
 * @route '/tenant/maintenance/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MaintenanceRequestController::create
 * @see app/Http/Controllers/MaintenanceRequestController.php:34
 * @route '/tenant/maintenance/create'
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
* @see \App\Http\Controllers\MaintenanceRequestController::store
 * @see app/Http/Controllers/MaintenanceRequestController.php:50
 * @route '/tenant/maintenance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tenant/maintenance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MaintenanceRequestController::store
 * @see app/Http/Controllers/MaintenanceRequestController.php:50
 * @route '/tenant/maintenance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MaintenanceRequestController::store
 * @see app/Http/Controllers/MaintenanceRequestController.php:50
 * @route '/tenant/maintenance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MaintenanceRequestController::store
 * @see app/Http/Controllers/MaintenanceRequestController.php:50
 * @route '/tenant/maintenance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MaintenanceRequestController::store
 * @see app/Http/Controllers/MaintenanceRequestController.php:50
 * @route '/tenant/maintenance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const maintenance = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
}

export default maintenance