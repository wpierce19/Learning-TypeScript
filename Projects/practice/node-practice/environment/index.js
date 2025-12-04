require("dotenv").config();

if(process.env.NODE_ENV === 'prod')
{
    //do production-specific stuff
}

//don't want to ruin the surprise by hardcoding the URL
//it might change every few days
redirectUserToSuperSecretVideo(process.env.VIDEO_URL);

//the config.env file will have to be added to .gitignore