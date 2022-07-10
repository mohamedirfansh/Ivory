class EmailResponse {
    constructor(jsonResponse) {
        this.id = jsonResponse.id;
        this.bodyPreview = jsonResponse.bodyPreview;
        this.webLink = jsonResponse.webLink;
        this.subject = jsonResponse.subject;
        this.start_time = jsonResponse.start.dateTime;
        this.end_time = jsonResponse.end.dateTime;
        this.location = jsonResponse.location;
        this.createdDateTime = jsonResponse.createdDateTime;
        this.lastModifiedDateTime = jsonResponse.lastModifiedDateTime;
        this.isOnlineMeeting = jsonResponse.isOnlineMeeting;
        this.onlineMeetingUrl = jsonResponse.onlineMeetingUrl;
        this.attendees = jsonResponse.attendees;
        this.body = jsonResponse.body;
        this.organizer_name = jsonResponse.organizer.emailAddress.name;
    }
}


export default OutlookEvent;

// Email:
//         {
    // "@odata.etag": "W/\"CQAAABYAAADnJ59xY3yUSoSeCl9X67DmAAYKUasa\"",
    // "id": "AQMkADAwATY3ZmYAZS1jMmE0LWI0MTItMDACLTAwCgBGAAADGeg3dDlwSkeqAM4T1jktYwcA5yefcWN8lEqEngpfV_uw5gAAAgEMAAAA5yefcWN8lEqEngpfV_uw5gAGCrBYCgAAAA==",
    // "createdDateTime": "2022-07-07T05:33:43Z",
    // "lastModifiedDateTime": "2022-07-07T05:33:44Z",
    // "changeKey": "CQAAABYAAADnJ59xY3yUSoSeCl9X67DmAAYKUasa",
    // "categories": [],
    // "receivedDateTime": "2022-07-07T05:33:43Z",
    // "sentDateTime": "2022-07-07T05:33:33Z",
    // "hasAttachments": false,
    // "internetMessageId": "<1806107839.817236.1657172013564@229b6874-5de7-4086-6461-e013>",
    // "subject": "Transaction Alerts",
    // "bodyPreview": "Transaction AlertsProblems viewing this email? Select \"always display images\".Transaction Ref: 50209171657171993974Dear Sir / Madam,We refer to your PayLah! Transfer dated 07 Jul. We are pleased to confirm that the transaction was completed.",
    // "importance": "normal",
    // "parentFolderId": "AQMkADAwATY3ZmYAZS1jMmE0LWI0MTItMDACLTAwCgAuAAADGeg3dDlwSkeqAM4T1jktYwEA5yefcWN8lEqEngpfV_uw5gAAAgEMAAAA",
    // "conversationId": "AQQkADAwATY3ZmYAZS1jMmE0LWI0MTItMDACLTAwCgAQANgVnf-7bp9PjKHewJPjkA0=",
    // "conversationIndex": "AQHYkcMf2BWd//tun0+Mod7Ak+OQDQ==",
    // "isDeliveryReceiptRequested": null,
    // "isReadReceiptRequested": false,
    // "isRead": false,
    // "isDraft": false,
    // "webLink": "https://outlook.live.com/owa/?ItemID=AQMkADAwATY3ZmYAZS1jMmE0LWI0MTItMDACLTAwCgBGAAADGeg3dDlwSkeqAM4T1jktYwcA5yefcWN8lEqEngpfV%2Buw5gAAAgEMAAAA5yefcWN8lEqEngpfV%2Buw5gAGCrBYCgAAAA%3D%3D&exvsurl=1&viewmodel=ReadMessageItem",
    // "inferenceClassification": "focused",
    // "body": {
    //     "contentType": "html",
    //     "content": "<html lang=\"en\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><meta content=\"telephone=no\" name=\"format-detection\"><style type=\"text/css\"><!--body{background-color:#ffffff;margin:0;padding:0;font-family:Arial}.androidWhite, .appleLinks a, .appleLinksWhite a{color:#ffffff!important;text-decoration:none}.appleLinks a, .appleLinksDark a{color:#444444!important;text-decoration:none}@media only screen and (max-width: 480px) {body .fullsize{width:100%;height:auto}body .contenttable{width:100%;padding-left:5px!important;padding-right:5px!important}body .contenttablemobile{width:100%;font-size:8px!important;padding-left:0px!important;padding-right:0px!important}body .deviceWidth{width:100%}body .redbutton{width:80%;height:40px!important;font-size:20px!important;font-weight:normal!important}body .redbuttonWrapper{width:100%;padding:10px 0px!important}body .social-image-resize{width:auto!important;padding-left:5px!important;padding-right:0px!important}body .add-bottom-padding-30{padding-bottom:30px!important}body .spacer_cards{padding:0px 0px 0px 0px!important;text-align:center!important}body .socialicon{width:60%!important;height:auto!important;text-align:left}body .trinity-logo{width:0px!important;height:0px!important;overflow:hidden!important}body .dbscards{width:100%;height:auto!important}}--></style></head><body leftmargin=\"0\" topmargin=\"0\" marginwidth=\"0\" marginheight=\"0\" style=\"\"><center><table border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" bgcolor=\"#ffffff\" class=\"deviceWidth\" style=\"border:1px solid #cccccc; background-color:#ffffff; max-width:600px\"><tbody><tr><td align=\"center\" height=\"50\" class=\"contenttable\" style=\"vertical-align:middle; text-align:center; font-family:Arial,Helvetica,sans-serif; font-size:11px; color:#303030; padding:10px 20px\">Transaction Alerts<br>Problems viewing this email? Select &quot;always display images&quot;.



        //     "sender": {
        //         "emailAddress": {
        //             "name": "PayLah! Alerts",
        //             "address": "paylah.alert@dbs.com"
        //         }
        //     },
        //     "from": {
        //         "emailAddress": {
        //             "name": "PayLah! Alerts",
        //             "address": "paylah.alert@dbs.com"
        //         }
        //     },
        //     "toRecipients": [
        //         {
        //             "emailAddress": {
        //                 "name": "ALVIN_TAY98@HOTMAIL.COM",
        //                 "address": "ALVIN_TAY98@HOTMAIL.COM"
        //             }
        //         }
        //     ],
        //     "ccRecipients": [],
        //     "bccRecipients": [],
        //     "replyTo": [],
        //     "flag": {
        //         "flagStatus": "notFlagged"
        //     }
        // },