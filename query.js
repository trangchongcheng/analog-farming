const { TimegraphClient } = require("@analog-labs/timegraph-js");
require("dotenv").config();

(async () => {
   const timeGraphClient = new TimegraphClient({
      url: "https://timegraph.testnet.analog.one/graphql",
      sessionKey: process.env.SESSION_KEY ?? "",
   });

   const aliasResponse = await timeGraphClient.alias.add({
      name: "cUSDC_Supply_and_Borrow_Rate",
      hashId: "QmX4eEvQajJ6Qqb4Qfj47BiCS79LT6zmwSEeQsvsEn9eE6",
   });
   console.log("aliasResponse: ", aliasResponse);

   const response = await timeGraphClient.view.data({
      hashId: "QmX4eEvQajJ6Qqb4Qfj47BiCS79LT6zmwSEeQsvsEn9eE6",
      fields: ["borrowrateperblock", "supplyrateperblock"],
      limit: 10,
   });
   console.log("listPublishedArtifacts: ", response);
})();
