import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\HouseAssignmentController::show
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
export const show = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tenants/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::show
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
show.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                }

    return show.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::show
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
show.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HouseAssignmentController::show
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
show.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::show
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
    const showForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::show
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
        showForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HouseAssignmentController::show
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
        showForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\HouseAssignmentController::search
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})

search.definition = {
    methods: ["post"],
    url: '/tenants/search',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::search
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::search
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
search.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: search.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::search
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: search.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::search
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
        searchForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: search.url(options),
            method: 'post',
        })
    
    search.form = searchForm
const tenants = {
    show: Object.assign(show, show),
search: Object.assign(search, search),
}

export default tenants