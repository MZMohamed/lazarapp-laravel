import React, {useState, useEffect, Suspense, lazy} from 'react'

//react-router-dom
import {
    useParams
  } from "react-router-dom";

//mui
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

//date-fns
import { format } from 'date-fns'

//aws
import { Amplify, Auth, API } from 'aws-amplify';
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

// components
// const OtherComponent = React.lazy(() => import('./OtherComponent'));
const Loading = lazy(() => import('../../components/Loading'))
const UserDetailItem = lazy(() => import('../../components/admin/users/UserDetailItem'))
const UserDetailActions = lazy(() => import('../../components/admin/users/UserDetailActions'))

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center'

  },
  surface: {
    width: '70%',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4)
   
  },
  pageTitle: {
    margin: theme.spacing(2)
  },
  userActions: {
    margin: theme.spacing(2)
  }
}));

let nextToken;

async function getUser(username){

  const apiName = 'AdminQueries';
  const path = '/getUser';
  const myInit = { 
      queryStringParameters: {
        "username": username,
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
  nextToken = NextToken;

  return rest;
}

async function listGroupsForUser(username){

    const apiName = 'AdminQueries';
    const path = '/listGroupsForUser';
    const myInit = { 
        queryStringParameters: {
          "username": username,
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
    nextToken = NextToken;

    return rest;
  }

const UserDetails = () => {

  const classes = useStyles();
    
  const [userDetails, setUserDetails] = useState({})
  const [userGroups, setUserGroups] = useState([])

  const {username} = useParams()

  useEffect(() => {
    if (username && username.length > 0) {

      getUser(username)
        .then(ud => 
          {
            setUserDetails(ud)
          })

      listGroupsForUser(username)
      .then(ug => 
        {
          setUserGroups(ug.Groups)
        })

    }
  }, [username])

  const groupsList = userGroups.map(g => 
    <div key={userGroups.indexOf(g)}>
      {g.GroupName}
    </div>)

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.pageTitle} color="secondary">
        {username} Details
      </Typography>

      <div className={classes.userActions}>
        <UserDetailActions
          userGroups={userGroups}
          setUserGroups={setUserGroups}
          username={username}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      </div>

      <Suspense fallback={<Loading />}>
        <Paper elevation={3} className={classes.surface}>
          {/* groups */}
          <UserDetailItem>
            <Typography component="h6">Groups</Typography>
            {/* <Typography component="h6">{( userGroups && userGroups.length > 0 ) ? userGroups.join(',') : 'Not assigned to a group'}</Typography> */}
            <div>{groupsList}</div>
          </UserDetailItem>

          {/* Account Status */}
          <UserDetailItem>
            <Typography component="h6">Account Status</Typography>
            <Typography>{userDetails.UserStatus}</Typography>
          </UserDetailItem>

          {/* Last Modified */}
          <UserDetailItem>
            <Typography component="h6">Last Modified</Typography>
            <Typography>
              {  
                  userDetails && 
                  userDetails.UserLastModifiedDate && 
                  format(new Date(userDetails.UserLastModifiedDate), 'ccc, PP p') 
              }
            </Typography>
          </UserDetailItem>

          {/* Created */}
          <UserDetailItem>
            <Typography component="h6">Created</Typography>
            <Typography>
              {  
                  userDetails && 
                  userDetails.UserCreateDate && 
                  format(new Date(userDetails.UserCreateDate), 'ccc, PP p') 
              }
            </Typography>
          </UserDetailItem>

          {/* User Attributes */}
          {userDetails && userDetails.UserAttributes
            ? userDetails.UserAttributes.map((ua) => (
                <UserDetailItem key={userDetails.UserAttributes.indexOf(ua)}>
                  <Typography component="h6">{ua.Name}</Typography>
                  <Typography component="h6">{ua.Value}</Typography>
                </UserDetailItem>
              ))
            : null}

          {/* Email Verified */}
          {/* Phone number verified */}
          {/* phone number */}
          {/* Email */}
        </Paper>
      </Suspense>
    </div>
  );
}

export default UserDetails
