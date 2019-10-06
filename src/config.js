let Config = {
    // PERSIST_SECRET_KEY: "",
    ENVIRONMENT: "LOCAL",
    ENVIRONMENTS: {
      LOCAL: {
        // API_URL: "http://localhost:4000"
        // API_URL: "https://savemoneyserver.herokuapp.com"
        API_URL: "https://desolate-stream-27036.herokuapp.com"
        // BASE_IMG_PATH: ""
      }
      // DEVELOPMENT: {
      //     API_URL: "",
      //     BASE_IMG_PATH: ""
      // },
      // PRODUCTION: {
      //     API_URL: "",
      //     BASE_IMG_PATH: ""
      // }
    }
  };
  
  Config.env = () => {
    return Config.ENVIRONMENTS[Config.ENVIRONMENT];
  };
  
  export default Config;