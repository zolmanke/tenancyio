import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:13
 * @route '/properties'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/properties',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:13
 * @route '/properties'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:13
 * @route '/properties'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:13
 * @route '/properties'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:13
 * @route '/properties'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:13
 * @route '/properties'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:13
 * @route '/properties'
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
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/properties/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/properties/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/properties/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/properties/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/properties/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/properties/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/properties/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/properties/create'
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
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:41
 * @route '/properties'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/properties',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:41
 * @route '/properties'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:41
 * @route '/properties'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:41
 * @route '/properties'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:41
 * @route '/properties'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:66
 * @route '/properties/{property}'
 */
export const show = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/properties/{property}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:66
 * @route '/properties/{property}'
 */
show.url = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { property: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { property: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    property: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        property: typeof args.property === 'object'
                ? args.property.id
                : args.property,
                }

    return show.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:66
 * @route '/properties/{property}'
 */
show.get = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:66
 * @route '/properties/{property}'
 */
show.head = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:66
 * @route '/properties/{property}'
 */
    const showForm = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:66
 * @route '/properties/{property}'
 */
        showForm.get = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:66
 * @route '/properties/{property}'
 */
        showForm.head = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\HouseAssignmentController::houses
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
export const houses = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: houses.url(args, options),
    method: 'get',
})

houses.definition = {
    methods: ["get","head"],
    url: '/properties/{property}/houses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::houses
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
houses.url = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { property: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { property: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    property: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        property: typeof args.property === 'object'
                ? args.property.id
                : args.property,
                }

    return houses.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::houses
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
houses.get = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: houses.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HouseAssignmentController::houses
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
houses.head = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: houses.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::houses
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
    const housesForm = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: houses.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::houses
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
        housesForm.get = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: houses.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HouseAssignmentController::houses
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
        housesForm.head = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: houses.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    houses.form = housesForm
const properties = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
houses: Object.assign(houses, houses),
}

export default properties