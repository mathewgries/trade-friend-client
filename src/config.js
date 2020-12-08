const config = {
    // s3: {
    //     REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
    //     BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME",
    // },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://n46bbl1sqa.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_K4RnCuNhm",
        APP_CLIENT_ID: "24t6dqs0thmsfvcokvp9tghm5p",
        IDENTITY_POOL_ID: "us-east-1:cd8bae03-8649-408a-9e71-da51146b7904",
    },
};

export default config;