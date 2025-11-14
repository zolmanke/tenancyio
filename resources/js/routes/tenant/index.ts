import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import maintenance from './maintenance'
/**
* @see \App\Http\Controllers\TenantDashboardController::dashboard
 * @see app/Http/Controllers/TenantDashboardController.php:13
 * @route '/tenant/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/tenant/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TenantDashboardController::dashboard
 * @see app/Http/Controllers/TenantDashboardController.php:13
 * @route '/tenant/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TenantDashboardController::dashboard
 * @see app/Http/Controllers/TenantDashboardController.php:13
 * @route '/tenant/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TenantDashboardController::dashboard
 * @see app/Http/Controllers/TenantDashboardController.php:13
 * @route '/tenant/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TenantDashboardController::dashboard
 * @see app/Http/Controllers/TenantDashboardController.php:13
 * @route '/tenant/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TenantDashboardController::dashboard
 * @see app/Http/Controllers/TenantDashboardController.php:13
 * @route '/tenant/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TenantDashboardController::dashboard
 * @see app/Http/Controllers/TenantDashboardController.php:13
 * @route '/tenant/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\TenantDashboardController::myHouse
 * @see app/Http/Controllers/TenantDashboardController.php:136
 * @route '/tenant/my-house'
 */
export const myHouse = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myHouse.url(options),
    method: 'get',
})

myHouse.definition = {
    methods: ["get","head"],
    url: '/tenant/my-house',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TenantDashboardController::myHouse
 * @see app/Http/Controllers/TenantDashboardController.php:136
 * @route '/tenant/my-house'
 */
myHouse.url = (options?: RouteQueryOptions) => {
    return myHouse.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TenantDashboardController::myHouse
 * @see app/Http/Controllers/TenantDashboardController.php:136
 * @route '/tenant/my-house'
 */
myHouse.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myHouse.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TenantDashboardController::myHouse
 * @see app/Http/Controllers/TenantDashboardController.php:136
 * @route '/tenant/my-house'
 */
myHouse.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myHouse.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TenantDashboardController::myHouse
 * @see app/Http/Controllers/TenantDashboardController.php:136
 * @route '/tenant/my-house'
 */
    const myHouseForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: myHouse.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TenantDashboardController::myHouse
 * @see app/Http/Controllers/TenantDashboardController.php:136
 * @route '/tenant/my-house'
 */
        myHouseForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myHouse.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TenantDashboardController::myHouse
 * @see app/Http/Controllers/TenantDashboardController.php:136
 * @route '/tenant/my-house'
 */
        myHouseForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myHouse.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    myHouse.form = myHouseForm
/**
* @see \App\Http\Controllers\TenantDashboardController::paymentHistory
 * @see app/Http/Controllers/TenantDashboardController.php:159
 * @route '/tenant/payment-history'
 */
export const paymentHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentHistory.url(options),
    method: 'get',
})

paymentHistory.definition = {
    methods: ["get","head"],
    url: '/tenant/payment-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TenantDashboardController::paymentHistory
 * @see app/Http/Controllers/TenantDashboardController.php:159
 * @route '/tenant/payment-history'
 */
paymentHistory.url = (options?: RouteQueryOptions) => {
    return paymentHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TenantDashboardController::paymentHistory
 * @see app/Http/Controllers/TenantDashboardController.php:159
 * @route '/tenant/payment-history'
 */
paymentHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TenantDashboardController::paymentHistory
 * @see app/Http/Controllers/TenantDashboardController.php:159
 * @route '/tenant/payment-history'
 */
paymentHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: paymentHistory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TenantDashboardController::paymentHistory
 * @see app/Http/Controllers/TenantDashboardController.php:159
 * @route '/tenant/payment-history'
 */
    const paymentHistoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: paymentHistory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TenantDashboardController::paymentHistory
 * @see app/Http/Controllers/TenantDashboardController.php:159
 * @route '/tenant/payment-history'
 */
        paymentHistoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentHistory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TenantDashboardController::paymentHistory
 * @see app/Http/Controllers/TenantDashboardController.php:159
 * @route '/tenant/payment-history'
 */
        paymentHistoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentHistory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    paymentHistory.form = paymentHistoryForm
const tenant = {
    dashboard: Object.assign(dashboard, dashboard),
myHouse: Object.assign(myHouse, myHouse),
paymentHistory: Object.assign(paymentHistory, paymentHistory),
maintenance: Object.assign(maintenance, maintenance),
}

export default tenant