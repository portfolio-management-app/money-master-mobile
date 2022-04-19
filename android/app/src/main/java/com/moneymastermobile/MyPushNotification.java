package com.moneymastermobile;
import android.app.Notification;
import android.content.Context;
import android.content.res.Resources;
import android.os.Bundle;

import com.wix.reactnativenotifications.core.AppLaunchHelper;
import com.wix.reactnativenotifications.core.notification.PushNotification;
import com.wix.reactnativenotifications.core.JsIOHelper;
import com.wix.reactnativenotifications.core.AppLifecycleFacade;

import static com.wix.reactnativenotifications.Defs.NOTIFICATION_RECEIVED_EVENT_NAME;
import static com.wix.reactnativenotifications.Defs.NOTIFICATION_RECEIVED_BACKGROUND_EVENT_NAME;

public class MyPushNotification extends PushNotification {

 
  public MyPushNotification(Context context, Bundle bundle, AppLifecycleFacade appLifecycleFacade, AppLaunchHelper appLaunchHelper, JsIOHelper jsIoHelper) {
    super(context, bundle, appLifecycleFacade, appLaunchHelper, jsIoHelper);
  }

  @Override public void onReceived() throws InvalidNotificationException {
    postNotification(null);
    notifyReceivedToJS();
  }

  private void notifyReceivedToJS() {
    String eventName = mAppLifecycleFacade.isAppVisible() ?
      NOTIFICATION_RECEIVED_EVENT_NAME :
      NOTIFICATION_RECEIVED_BACKGROUND_EVENT_NAME;

    mJsIOHelper.sendEventToJS(
      eventName,
      mNotificationProps.asBundle(),
      mAppLifecycleFacade.getRunningReactContext()
    );
  }
}