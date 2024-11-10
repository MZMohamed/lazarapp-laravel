import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';

//mui
import { Button } from "@material-ui/core";

//components
import GroupDialogue from "./GroupDialogue";

import { Amplify, Auth, API } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
Amplify.configure(awsconfig);

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
      },
    }
  }));

  let nextToken;

  const getUser = async (username) => {
  
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


  async function disableUser(user) { 
    const apiName = 'AdminQueries';
    const path = '/disableUser';
    const myInit = {
        body: {
          "username" : user
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    return await API.post(apiName, path, myInit);
  }

  async function enableUser(user) { 
    const apiName = 'AdminQueries';
    const path = '/enableUser';
    const myInit = {
        body: {
          "username" : user
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    return await API.post(apiName, path, myInit);
  }

  const removeUserFromGroup = async (username, groupname) => { 
    const apiName = 'AdminQueries';
    const path = '/removeUserFromGroup';
    const myInit = {
        body: {
          "username" : username,
          "groupname": groupname
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    return await API.post(apiName, path, myInit);
  }

  const addToGroup = async (username, groupname) => { 
    const apiName = 'AdminQueries';
    const path = '/addUserToGroup';
    const myInit = {
        body: {
          "username" : username,
          "groupname": groupname
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    return await API.post(apiName, path, myInit);
  }

  const deleteUser = async (username) => { 
    const apiName = 'AdminQueries';
    const path = '/deleteUser';
    const myInit = {
        body: {
          "username" : username,
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    return await API.post(apiName, path, myInit);
  }

  const resetUserPassword = async (username) => { 
    const apiName = 'AdminQueries';
    const path = '/resetUserPassword';
    const myInit = {
        body: {
          "username" : username,
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    return await API.post(apiName, path, myInit);
  }

  const signUserOut = async (username) => { 
    const apiName = 'AdminQueries';
    const path = '/signUserOut';
    const myInit = {
        body: {
          "username" : username,
        }, 
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        } 
    }
    return await API.post(apiName, path, myInit);
  }

const UserDetailActions = ({
  userGroups,
  setUserGroups,
  username,
  userDetails,
  setUserDetails
}) => {

  const classes = useStyles();

  // ====================BEGIN=========================================
  // Add to group state and functions
  const [groups, setGroups] = useState({
    admin: false,
    driver: false,
    client: false
  });

  useEffect(() => {
    const admin =
      userGroups.map(e => e.GroupName).indexOf("admin") === -1 ? false : true;
    const driver =
      userGroups.map(e => e.GroupName).indexOf("driver") === -1 ? false : true;
    const client =
      userGroups.map(e => e.GroupName).indexOf("client") === -1 ? false : true;

    setGroups({ admin, driver, client });
  }, [userGroups]);

  const [openAddToGroup, setOpenAddToGroup] = useState(false);
  const addToGroupHandleOpen = () => {
    setOpenAddToGroup(true);
  };
  const addToGroupHandleCloseCancel = () => {
    setOpenAddToGroup(false);
  };

  const userEnableToggle = e => {
    e.preventDefault();

    userDetails && userDetails.Enabled
      ? disableUser(username)
          .then(res => {
            getUser(username).then(res => {
              setUserDetails(res);
            });

            alert(res.message);
          })
          .catch(err => {
            console.log("Error:", err);
          })
      : enableUser(username)
          .then(res => {
            getUser(username).then(res => {
              setUserDetails(res);
            });

            alert(res.message);
          })
          .catch(err => {
            console.log("Error:", err);
          });
  };

  const addToGroupHandleCloseSubmit = () => {
    setOpenAddToGroup(false);

    Object.keys(groups).forEach(key => {
      groups[key]
        ? addToGroup(username, key)
        : removeUserFromGroup(username, key);
    });

    listGroupsForUser(username).then(ug => {
      setUserGroups(ug.Groups);
    });
  };
  // ====================== END =========================================

  return (
    <div className={classes.root}>
      
      <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        onClick={addToGroupHandleOpen}
      >
        Groups
      </Button>

      <Button className={classes.button} variant="outlined" color="secondary"
        onClick={() => {
          resetUserPassword(username)
          .then(res => {
            alert(res.message)
          })
          .catch(err => {
            console.log("Error:", err);
          });
        }}
      >
        Reset Password
      </Button>

      <Button className={classes.button} variant="outlined" color="secondary"
        onClick={() => {
          signUserOut(username)
            .then(res => {
              alert(res.message)
            })
            .catch(err => {
              console.log("Error:", err);
            });
        }}
      >
        Sign User Out
      </Button>

      <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        onClick={userEnableToggle}
      >
        {userDetails && userDetails.Enabled ? "Disable" : "Enable"}
      </Button>

      {userDetails && !userDetails.Enabled ? (
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={() => {
            deleteUser(username)
              .then(res => {
                alert(res.message)
              })
              .catch(err => {
                console.log("Error:", err);
              });
          }}
        >
          Delete
        </Button>
      ) : null}
      <GroupDialogue
        open={openAddToGroup}
        handleClose={addToGroupHandleCloseCancel}
        handleSubmit={addToGroupHandleCloseSubmit}
        userGroups={userGroups}
        groups={groups}
        setGroups={setGroups}
      />
    </div>
  );
};

export default UserDetailActions
