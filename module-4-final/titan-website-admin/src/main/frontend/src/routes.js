import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))

const Events = React.lazy(() => import('./views/Events/Events'))
const Event = React.lazy(() => import('./views/Events/Event'))
const EditEvent = React.lazy(() => import('./views/Events/EditEvent'))
const NewEvent = React.lazy(() => import('./views/Events/NewEvent'))

const RoleManagement = React.lazy(() => import('./components/RoleManagement'))
const NavManagement = React.lazy(() => import('./components/NavManagement'))
const SourcesManagement = React.lazy(() => import('./components/SourcesManagement'))
const RulesManagement = React.lazy(() => import('./components/RulesManagement'))
const RuleInfo = React.lazy(() => import('./components/RuleInfo'))
const SourceInfo = React.lazy(() => import('./components/SourceInfo'))
const DomainManagement = React.lazy(() => import('./components/DomainManagement'))
const DomainInfo = React.lazy(() => import('./components/DomainInfo'))
const ProfileManagement = React.lazy(() => import('./components/ProfileManagement'))
const ProfileInfo = React.lazy(() => import('./components/ProfileInfo'))
const TierManagement = React.lazy(() => import('./components/TierManagement'))
const TierInfo = React.lazy(() => import('./components/TierInfo'))
const RuleVersionInfo = React.lazy(() => import('./components/RuleVersionInfo'))

const DataDefinitions = React.lazy(() => import('./components/DataDefinitions'))
const DataDefinitionsInfo = React.lazy(() => import('./components/DataDefinitionsInfo'))
const AccumulationKeys = React.lazy(() => import('./components/AccumulationKeys'))

const ReloadConfig = React.lazy(() => import('./components/ReloadConfig'))

const ClientManagement = React.lazy(() => import('./components/ClientManagement'))
const ClientInfo = React.lazy(() => import('./components/ClientInfo'))
const ConditionManagement = React.lazy(() => import('./components/ConditionManagement'))
const ConditionInfo = React.lazy(() => import('./components/ConditionInfo'))
const InfoCodeManagement = React.lazy(() => import('./components/InfoCodeManagement'))
const InfoCodeInfo = React.lazy(() => import('./components/InfoCodeInfo'))

const ActionCodeManagement = React.lazy(() => import('./components/ActionCodeManagement'))
const ActionCodeInfo = React.lazy(() => import('./components/ActionCodeInfo'))

const CheckAccumulation = React.lazy(() => import('./components/CheckAccumulation'))
const ManualData = React.lazy(() => import('./components/ManualData'))
const Profile = React.lazy(() => import('./components/Profile'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
	{ path: '/', exact: true, name: 'Home' },
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
	{ path: '/events', exact: true, name: 'Events', component: Events },
	{ path: '/events/event/add', exact: true, name: 'Add new event', component: NewEvent },
	{ path: '/events/:id/edit', exact: true, name: 'Edit', component: EditEvent },
	{ path: '/events/:id', exact: true, name: 'Info', component: Event },

	{ path: '/domains', exact: true, name: 'Domains', component: DomainManagement },
	{ path: '/domains/:id', exact: true, name: 'DomainInfo', component: DomainInfo },
	{ path: '/profiles', exact: true, name: 'Profiles', component: ProfileManagement },
	{ path: '/profiles/:id', exact: true, name: 'ProfileInfo', component: ProfileInfo },
	{ path: '/tiers', exact: true, name: 'Tiers', component: TierManagement },
	{ path: '/tiers/:id', exact: true, name: 'TierInfo', component: TierInfo },
	{ path: '/conditions', exact: true, name: 'Conditions', component: ConditionManagement },
	{ path: '/conditions/:id', exact: true, name: 'ConditionInfo', component: ConditionInfo },

	{ path: '/info-code', exact: true, name: 'InfoCode', component: InfoCodeManagement },
	{ path: '/info-code/:id', exact: true, name: 'InfoCodeInfo', component: InfoCodeInfo },

	{ path: '/action-code', exact: true, name: 'ActionCode', component: ActionCodeManagement },
	{ path: '/action-code/:id', exact: true, name: 'ActionCodeInfo', component: ActionCodeInfo },

	{ path: '/clients', exact: true, name: 'Clients', component: ClientManagement },
	{ path: '/clients/:id', exact: true, name: 'ClientInfo', component: ClientInfo },

	{ path: '/rules', exact: true, name: 'Rules', component: RulesManagement },
	{ path: '/rules/:id', exact: true, name: 'RuleInfo', component: RuleInfo },
	{ path: '/ruleVersions/:id', exact: true, name: 'RuleVersionInfo', component: RuleVersionInfo },

	{ path: '/sources', exact: true, name: 'Sources', component: SourcesManagement },
	{ path: '/sources/:id', exact: true, name: 'SourceInfo', component: SourceInfo },
	{ path: '/data-definitions', exact: true, name: 'DataDefinitions', component: DataDefinitions },
	{ path: '/accumulation-keys', exact: true, name: 'AccumulationKeys', component: AccumulationKeys },
	{ path: '/check-accumulation', exact: true, name: 'CheckAccumulation', component: CheckAccumulation },
	{ path: '/manual-data', exact: true, name: 'ManualData', component: ManualData },
	{ path: '/reload-config', exact: true, name: 'ReloadConfig', component: ReloadConfig },
	{ path: '/role-management', name: 'RoleManagement', component: RoleManagement },
	{ path: '/nav-management', name: 'NavManagement', component: NavManagement },
	{ path: '/profile', name: 'Profile', component: Profile }
]

export default routes
