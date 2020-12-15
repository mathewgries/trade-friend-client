const dev = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "trade-friend-api-dev-serverlessdeploymentbucket-1250u2h5zx5o3"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://392ta9wjeb.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_onADXEQzD",
      APP_CLIENT_ID: "1hg807spa5vh47qqumrjd7n20d",
      IDENTITY_POOL_ID: "us-east-1:cfbe445e-33c9-4d68-92fd-500cdc9efd18"
    }
  };
  
  const prod = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "trade-friend-api-prod-serverlessdeploymentbucket-f2wnx4l4zqmx"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://n46bbl1sqa.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_3hRWoow40",
      APP_CLIENT_ID: "7te1r4p1ored6unpfab0hbj35e",
      IDENTITY_POOL_ID: "us-east-1:0ebfdda8-fd41-4755-9cfa-aa4756117f0a"
    }
  };
  
  const config = {
    // Default to dev if not set
    ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
  };
  
  export default config;