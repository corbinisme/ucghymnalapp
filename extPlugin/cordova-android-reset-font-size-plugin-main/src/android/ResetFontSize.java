package com.github.devoter.cordova.plugin;

import android.webkit.WebView;
import android.webkit.WebSettings;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;

import org.json.JSONArray;
import org.json.JSONException;

/**
 * This class prevents the webview from scaling font size due to Android font
 * settings.
 */
public class ResetFontSize extends CordovaPlugin {
  protected WebView wV;

  /**
   * Sets the context of the Command. This can then be used to do things like
   * get file paths associated with the Activity.
   *
   * @param cordova The context of the main Activity.
   * @param webView The CordovaWebView Cordova is running in.
   */
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);

    wV = (WebView) webView.getView();
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if ("reset".equals(action)) {
      this.resetFontSize(callbackContext);

      return true;
    }

    return false;
  }

  /**
   * Resets the font size.
   *
   * @param callbackContext The callback context object.
   */
  private void resetFontSize(CallbackContext callbackContext) {
    wV.post(new Runnable() {
      public void run() {
        WebSettings settings = wV.getSettings();

        settings.setTextZoom(100);
        settings.setSupportZoom(false);

        callbackContext.success();
      }
    });
  }
}