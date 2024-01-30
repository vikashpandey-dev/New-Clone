pushnotification.PushNotificationScheduler = async (userData, req, result) => {
  var request = new sql.Request();
  let Records = [];
  var offset = 0;
  var recordperpage = 10;
  var pagenumber = 1;
  try {
    var jobStart = schedule.scheduleJob("*/5 * * * * *", async () => {
      let query1 = `exec Proc_Get_firebse_User
        @status=${val("Not Triggered")}`;
      if (offset > 0) {
        query1 += `, @offset=${val(offset)}`;
      }
      console.log(query1);
      let { recordsets } = await request.query(query1);
      if (recordsets[0].length > 0) {
        Records = [...recordsets[0]];
        for (let i = 0; i < Records.length; i++) {
          let message_notification = {
            notification: {
              title: Records[i].title,
              body: Records[i].message,
            },
          };
          if (Records[i].token) {
            if (Records[i].trigerdate) {
              let givendate = new Date(Records[i].trigerdate);
              let currentdate = new Date();
              let dateequals =
                givendate.toDateString() === currentdate.toDateString();
              if (dateequals && Records[i].trigertime) {
                const currentTime = new Date();
                const givenTimeStr = Records[i].trigertime;
                const givenTimeParts = givenTimeStr.split(":");
                const givenTime = new Date();
                givenTime.setHours(parseInt(givenTimeParts[0], 10));
                givenTime.setMinutes(parseInt(givenTimeParts[1], 10));
                givenTime.setSeconds(0);
                if (currentTime < givenTime) {
                  console.log("The current time is before the given time.");
                } else if (currentTime > givenTime) {
                  let data = await helpers.sendMessage(
                    message_notification,
                    Records[i].token
                  );
                  if (data.successCount == 1) {
                    let query1 = `exec Proc_Update_firebse_User
                    @EMPL_ID=${val(Records[i].EMPL_ID)},
                    @offset=${val("Success")},
                    @multicastId=${val(data.multicastId)},
                    @messageId=${val(data.results[0].messageId)}
                    `;
                    let { recordsets } = await request.query(query1);
                  }
                } else {
                  console.log("The current time is equal to the given time.");
                }
              }
            } else {
              let data = await helpers.sendMessage(
                message_notification,
                Records[i].token
              );
              console.log(data);
              if (data.successCount == 1) {
                let query1 = `exec Proc_Update_firebse_User
                 @EMPL_ID=${val(Records[i].EMPL_ID)},
                 @status=${val("Success")},
                 @multicastId=${val(data.multicastId)},
                 @messageId=${val(data.results[0].messageId)}
      `;
                let { recordsets } = await request.query(query1);
              }
            }
          } else {
            let query1 = `exec Proc_Update_firebse_User
            @EMPL_ID=${val(Records[i].EMPL_ID)},
            @status=${val("Fail")}
            `;
            let { recordsets } = await request.query(query1);
          }
        }
      } else {
        Records = [];
      }
      console.log(Records.length);
      if (Records.length == 0) {
        offset = 0;
        recordperpage = 10;
        pagenumber = 1;
      }
      if (Records.length > 0) {
        pagenumber++;
        offset = (pagenumber - 1) * recordperpage;
        jobStart.reschedule("*/3 * * * * *");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
