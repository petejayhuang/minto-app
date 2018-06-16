import React from "react"
import TouchableRow from "../../components/TouchableRow"
import { RouteWithSubRoutes } from "../../utilities/renderRoutes"
{
  /* <div className="pl-1 pt-3 pb-1">
  <strong>ACCOUNT</strong>
</div>

<TouchableRow to="/settings/edit-profile" text="Edit Profile" />

<TouchableRow to="/settings/change-password" text="Change Password" />
<TouchableRow borderBottom text="Privacy and Security" />

<div className="pl-1 pt-3 pb-1">
  <strong>SETTINGS</strong>
</div>
<TouchableRow text="Language" />
<TouchableRow text="Authorised Apps" />
<TouchableRow borderBottom text="Notifications" />

<TouchableRow borderBottom className="mt-2" text="Log Out" /> */
}

const Profile = props => (
  <div className="route-container">
    {props.routes.map(route => {
      const { exact, path, component } = route
      return <RouteWithSubRoutes key={path} exact={exact} {...route} />
    })}
  </div>
)
export default Profile
