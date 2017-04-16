
//redirect requests
function route( handle , pathname , response , postDate )
{
    if( typeof handle[ pathname ] === 'function' )
    {
        handle[ pathname ]( response , postDate );
    }
    else
    {
        handle[ "file" ]( response , pathname );
    }
}

exports.route = route;
