import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HouseAssignmentController::getHousesByProperty
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
export const getHousesByProperty = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHousesByProperty.url(args, options),
    method: 'get',
})

getHousesByProperty.definition = {
    methods: ["get","head"],
    url: '/properties/{property}/houses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::getHousesByProperty
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
getHousesByProperty.url = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return getHousesByProperty.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::getHousesByProperty
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
getHousesByProperty.get = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getHousesByProperty.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HouseAssignmentController::getHousesByProperty
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
getHousesByProperty.head = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getHousesByProperty.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::getHousesByProperty
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
    const getHousesByPropertyForm = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getHousesByProperty.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::getHousesByProperty
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
        getHousesByPropertyForm.get = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHousesByProperty.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HouseAssignmentController::getHousesByProperty
 * @see app/Http/Controllers/HouseAssignmentController.php:118
 * @route '/properties/{property}/houses'
 */
        getHousesByPropertyForm.head = (args: { property: string | number | { id: string | number } } | [property: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getHousesByProperty.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getHousesByProperty.form = getHousesByPropertyForm
/**
* @see \App\Http\Controllers\HouseAssignmentController::history
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
export const history = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/houses/{house}/assignment-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::history
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
history.url = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return history.definition.url
            .replace('{house}', parsedArgs.house.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::history
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
history.get = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HouseAssignmentController::history
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
history.head = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::history
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
    const historyForm = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::history
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
        historyForm.get = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HouseAssignmentController::history
 * @see app/Http/Controllers/HouseAssignmentController.php:189
 * @route '/houses/{house}/assignment-history'
 */
        historyForm.head = (args: { house: string | number | { id: string | number } } | [house: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
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
/**
* @see \App\Http\Controllers\HouseAssignmentController::getTenantByUuid
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
export const getTenantByUuid = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTenantByUuid.url(args, options),
    method: 'get',
})

getTenantByUuid.definition = {
    methods: ["get","head"],
    url: '/tenants/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::getTenantByUuid
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
getTenantByUuid.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getTenantByUuid.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::getTenantByUuid
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
getTenantByUuid.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTenantByUuid.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HouseAssignmentController::getTenantByUuid
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
getTenantByUuid.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTenantByUuid.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::getTenantByUuid
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
    const getTenantByUuidForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getTenantByUuid.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::getTenantByUuid
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
        getTenantByUuidForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTenantByUuid.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HouseAssignmentController::getTenantByUuid
 * @see app/Http/Controllers/HouseAssignmentController.php:30
 * @route '/tenants/{uuid}'
 */
        getTenantByUuidForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getTenantByUuid.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getTenantByUuid.form = getTenantByUuidForm
/**
* @see \App\Http\Controllers\HouseAssignmentController::searchTenant
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
export const searchTenant = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: searchTenant.url(options),
    method: 'post',
})

searchTenant.definition = {
    methods: ["post"],
    url: '/tenants/search',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HouseAssignmentController::searchTenant
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
searchTenant.url = (options?: RouteQueryOptions) => {
    return searchTenant.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HouseAssignmentController::searchTenant
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
searchTenant.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: searchTenant.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HouseAssignmentController::searchTenant
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
    const searchTenantForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: searchTenant.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HouseAssignmentController::searchTenant
 * @see app/Http/Controllers/HouseAssignmentController.php:130
 * @route '/tenants/search'
 */
        searchTenantForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: searchTenant.url(options),
            method: 'post',
        })
    
    searchTenant.form = searchTenantForm
const HouseAssignmentController = { getHousesByProperty, history, create, store, terminate, destroy, getTenantByUuid, searchTenant }

export default HouseAssignmentController