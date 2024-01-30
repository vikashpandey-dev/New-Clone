const SendFirebaseNotification = async (message_notification, Records) => {
  try {
    let data = await helpers.sendMessage(message_notification, Records.token);
    if (data.successCount === 1) {
      let query1 = `
        exec Proc_Update_firebse_User
        @EMPL_ID=${val(Records.id)},
        @status=${val('Success')},
        @multicastId=${val(data.multicastId)},
        @messageId=${val(data.results[0].messageId)}
      `;
      await request.query(query1);
      let query2 = `
        exec PROC_Notificationlogs
        @mobile=${val(Records.mobile)},
        @message=${val(Records.message)},
        @status=${val('Success')},
        @Name=${val(Records.Name || 'null')},
        @EMPL_ID=${val(Records.EMPL_ID)},
        @multicastId=${val(data.multicastId)},
        @messageId=${val(data.results[0].messageId)},
        @title=${val(Records.title)},
        @token=${val(Records.token)}
      `;
      await request.query(query2);
    }
  } catch (error) {
    console.error("Error in SendFirebaseNotification:", error);
  }
};
pushnotification.PushNotificationScheduler = async (userData, req, result) => {
  try {
    var request = new sql.Request();
    let Records = [];
    var offset = 0;
    var recordperpage = 10;
    var pagenumber = 1;
    var jobStart = schedule.scheduleJob('*/5 * * * * *', async () => {
      try {
        let query1 = `
          exec Proc_Get_firebse_User
          @status=${val('Not Triggered')}
        `;
        if (offset > 0) {
          query1 += `, @offset=${val(offset)}`;
        }
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
              if (Records[i].trigerdate && Records[i].trigerdate != 'null') {
                let givendate = new Date(Records[i].trigerdate);
                let currentdate = new Date();
                let dateequals = givendate.toDateString() === currentdate.toDateString();
                if (dateequals && Records[i].trigertime && Records[i].trigertime!='null') {
                  const currentTime = new Date();
                  const givenTimeStr = Records[i].trigertime;
                  const givenTimeParts = givenTimeStr.split(':');
                  const givenTime = new Date();
                  givenTime.setHours(parseInt(givenTimeParts[0], 10));
                  givenTime.setMinutes(parseInt(givenTimeParts[1], 10));
                  givenTime.setSeconds(0);
                  let givenminute = givenTime.getHours() * 60 + givenTime.getMinutes();
                  let currentminute = currentTime.getHours() * 60 + currentTime.getMinutes();
                  if (currentminute >= givenminute) {
                    await SendFirebaseNotification(message_notification, Records[i]);
                  }
                }
              } else {
                await SendFirebaseNotification(message_notification, Records[i]);
              }
            } else {
              let query1 = `
                exec Proc_Update_firebse_User
                @EMPL_ID=${val(Records[i].EMPL_ID)},
                @status=${val('Fail')}
              `;
              await request.query(query1);
            }
          }
        } else {
          Records = [];
        }
        if (Records.length === 0) {
          offset = 0;
          recordperpage = 10;
          pagenumber = 1;
          await deletesuccessnotification();
        }
        if (Records.length > 0) {
          pagenumber++;
          offset = (pagenumber - 1) * recordperpage;
          jobStart.reschedule('*/3 * * * * *');
        }
      } catch (error) {
        console.error("Error in PushNotificationScheduler:", error);
      }
    });
  } catch (error) {
    console.error("Error in PushNotificationScheduler (outer try block):", error);
  }
};
const deletesuccessnotification = async () => {
  try {
    let query = `exec PROC_DELETE_SUCCESS_NOTIFICATION`;
    await request.query(query);
  } catch (err) {
    console.error("Error in deletesuccessnotification:", err);
  }
};
