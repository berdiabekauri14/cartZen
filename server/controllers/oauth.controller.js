const axios = require('axios');

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize"
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
const GITHUB_USERINFO_URL = "https://api.github.com/user"

const getGoogleAuthUrl = (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
    });


    res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
}

const googleCallback = async (req, res, next) => {
    try {
        const { code } = req.query;

        const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        });

        const { access_token } = tokenResponse.data; 

        const userInfo = await axios.get(GOOGLE_USERINFO_URL, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const { email, name, picture, sub, email_verified } = userInfo.data;

        const user = await User.findOne({oauthid: sub, email});

        if(user) {
            return createSendToken(user, 200, res)
        }

        if(!email_verified) {
            return next(new AppError('Google account not verified', 400));
        }

        const newUser = await User.create({
            fullname: name,
            email,
            avatar: picture,
            oauthid: sub,
            oauthProvider: 'google',
            isVerified: true,
        });

        createSendToken(newUser, 201, res);
    } catch(err) {
        console.log(err);
    }
};


const getFacebookAuthUrl = (req, res) => {
    const params = new URLSearchParams({
        client_id: FACEBOOK_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: "public_profile",
    });

    res.redirect(`https://www.facebook.com/v17.0/dialog/oauth?${params.toString()}`);
};

const facebookCallback = async (req, res) => {
    try {
        const { code } = req.query;
        
        const tokenResponse = await axios.get("https://graph.facebook.com/v17.0/oauth/access_token", {
            params: {
                client_id: FACEBOOK_CLIENT_ID,
                client_secret: FACEBOOK_CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                code,
            },
        });
        
        const { access_token } = tokenResponse.data;
        
        const userInfo = await axios.get("https://graph.facebook.com/me", {
            params: {
                fields: "id,name,email,picture",
                access_token
            }
        });
        
        console.log(userInfo.data);
    } catch(err) {
        console.log(err);
    }
};

const getGithubAuthUrl = (req, res) => {
    const rootUrl = 'https://github.com/login/oauth/authorize';
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
        scope: 'read:user user:email',
    });

    res.redirect(`${rootUrl}?${params.toString()}`);
};

const githubCallback = async (req, res) => {
    try {
        const { code } = req.query;

        const tokenResponse = await axios.get('https://github.com/login/oauth/access_token', {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_SECRET,
                code,
                redirect_uri: process.env.GITHUB_REDIRECT_URI
            }
        });

        const accessToken = new URLSearchParams(tokenResponse.data).get('access_token');

        const userInfo = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        console.log(userInfo.data)
    } catch(err) {
        console.log(err);
    }
}

module.exports = {googleCallback, getGoogleAuthUrl, getFacebookAuthUrl, facebookCallback, getGithubAuthUrl, githubCallback};