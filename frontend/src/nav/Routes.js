import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from '../auth/Login'
import Signup from '../auth/Signup'

import DirectoryAdd from '../directory/Add'
import DirectoryList from '../directory/List'
import DirectoryDetails from '../directory/Details'

import ProfileUpdate from '../profiles/Update'
import ProfileBookmarks from '../profiles/Bookmarks'
import Profile from '../profiles/Profile'

import StepsAdd from '../steps/Add'

const Routes = ({login, signup}) => {

	return (
		<div>
			<Switch>
				<Route exact path='/'>
					<DirectoryList/>
				</Route>

				<Route exact path='/users/login'>
					<Login login={login}/>
				</Route>

				<Route exact path='/users/signup'>
					<Signup signup={signup}/>
				</Route>

				<Route exact path='/users/:username'>
					<Profile foo={'foo'}/>
				</Route>

				<Route exact path='/users/:username/update'>
					<ProfileUpdate/>
				</Route>

				<Route exact path='/users/:username/bookmarks'>
					<ProfileBookmarks/>
				</Route>

				<Route exact path='/directory'>
					<DirectoryList/>
				</Route>

				<Route exact path='/directory/:reference-point'>
					<DirectoryDetails/>
				</Route>

				<Route exact path='/directory/add'>
					<DirectoryAdd/>
				</Route>

				<Route exact path='/steps/add'>
					<StepsAdd/>
				</Route>

				<Redirect to='/'/>
			</Switch>
		</div>
	)
}

export default Routes