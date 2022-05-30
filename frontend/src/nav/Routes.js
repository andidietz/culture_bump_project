import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import DirectoryAdd from '../directory/Add'
import DirectoryList from '../directory/List'
import DirectoryDetails from '../directory/Details'
import StepsAdd from '../steps/Add'

import ProfileUpdate from '../profiles/Update'
import Profile from '../profiles/Profile'
import Login from '../auth/Login'
import Signup from '../auth/Signup'


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

				<PrivateRoute exact path='/users/:username'>
					<Profile foo={'foo'}/>
				</PrivateRoute>

				<PrivateRoute exact path='/users/:username/update'>
					<ProfileUpdate/>
				</PrivateRoute>

				<Route exact path='/directory'>
					<DirectoryList/>
				</Route>
				
				<PrivateRoute exact path='/directory/add/:id'>
					<DirectoryAdd/>
				</PrivateRoute>

				<Route exact path='/directory/:id'>
					<DirectoryDetails/>
				</Route>

				<PrivateRoute exact path='/steps/add'>
					<StepsAdd/>
				</PrivateRoute>

				<Redirect to='/'/>
			</Switch>
		</div>
	)
}

export default Routes