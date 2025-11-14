import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
const HouseController = { create, store }

export default HouseController