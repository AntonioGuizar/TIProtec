<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
# define the route /
$routes->get('/', 'Home::index');
$routes->resource('users');
