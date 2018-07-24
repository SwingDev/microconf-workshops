import withParentPrefix from '..';

const ROUTE_PREFIX = '/dashboard';

const MOCK_DASHBOARD_ROUTES = {
  RESCHEDULE: '/reschedule',
  EMPTY: '/empty'
};

describe('with-parent-prefix', () => {
  it('should generate route objects', () => {
    const routesWithPrefix = withParentPrefix(ROUTE_PREFIX, MOCK_DASHBOARD_ROUTES);

    expect(routesWithPrefix).toEqual({
      ROOT: ROUTE_PREFIX,
      RESCHEDULE: `${ROUTE_PREFIX}${MOCK_DASHBOARD_ROUTES.RESCHEDULE}`,
      EMPTY: `${ROUTE_PREFIX}${MOCK_DASHBOARD_ROUTES.EMPTY}`,
    });
  });

  it('should generate route object with nested routes', () => {
    const NESTED_PREFIX = '/your-spaces';

    const NESTED_ROUTES = {
      ...MOCK_DASHBOARD_ROUTES,
      yourSpaces: withParentPrefix(NESTED_PREFIX, {
        ADD_NEW: '/add-new'
      })
    };

    const routesWithPrefix = withParentPrefix(ROUTE_PREFIX, NESTED_ROUTES);

    expect(routesWithPrefix).toEqual({
      ROOT: ROUTE_PREFIX,
      RESCHEDULE: `${ROUTE_PREFIX}${MOCK_DASHBOARD_ROUTES.RESCHEDULE}`,
      EMPTY: `${ROUTE_PREFIX}${MOCK_DASHBOARD_ROUTES.EMPTY}`,
      yourSpaces: {
        ROOT: `${ROUTE_PREFIX}${NESTED_PREFIX}`,
        ADD_NEW: `${ROUTE_PREFIX}${NESTED_PREFIX}/add-new`
      }
    });
  });
});
