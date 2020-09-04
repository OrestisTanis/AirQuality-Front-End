import React, {useEffect} from 'react';
import usePathNameState from '../pathname-state';
import {useHistory} from 'react-router-dom';

function PathWatcher(){
    const [pathName, setPathName ] = usePathNameState();
    const history = useHistory();

    // Executed each time the url changes
    useEffect(() => {
        return history.listen((location) => {
            setPathName(location.pathname);
        })
    }, [history])

    return (
        null
    )
}

export default PathWatcher;



