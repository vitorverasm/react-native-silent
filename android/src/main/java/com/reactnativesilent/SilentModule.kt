package com.reactnativesilent

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Context.AUDIO_SERVICE
import android.content.Intent
import android.content.IntentFilter
import android.media.AudioManager
import com.facebook.react.bridge.*


class SilentModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private val audioManager: AudioManager = reactApplicationContext.getSystemService(AUDIO_SERVICE) as AudioManager
  private val receiver: BroadcastReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
      val silentStatus = Utils.getSilentStatus(audioManager)
      val data = Arguments.createMap()
      data.putBoolean("status", silentStatus.status)
      data.putString("mode", silentStatus.mode.name)
      Utils.sendEventToReactNative(eventName = "RNSilentEvent", reactContext = reactApplicationContext, params = data)
    }
  }

  override fun getName(): String {
    return "Silent"
  }

  @ReactMethod
  fun isEnabled(promise: Promise) {
    val silentStatus = Utils.getSilentStatus(audioManager)
    if (silentStatus.status) {
      promise.resolve(true)
    } else {
      promise.resolve(false)
    }
  }

  @ReactMethod
  fun registerObserver() {
    val filter = IntentFilter()
    filter.addAction(AudioManager.RINGER_MODE_CHANGED_ACTION)
    filter.addAction("android.media.VOLUME_CHANGED_ACTION")
    reactApplicationContext.registerReceiver(receiver, filter)
  }

  @ReactMethod
  fun unregisterObserver() {
    reactApplicationContext.unregisterReceiver(receiver);
  }
}
