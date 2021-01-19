package com.reactnativesilent

import android.media.AudioManager
import androidx.annotation.Nullable
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import kotlin.math.ln

enum class MODE {
  SILENT,
  VIBRATE,
  NORMAL,
  MUTED,
}

class Utils {
  companion object {
    fun sendEventToReactNative(reactContext: ReactContext,
                               eventName: String,
                               @Nullable params: WritableMap) {
      reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(eventName, params)
    }

    fun getSilentStatus(audioManager: AudioManager): SilentStatus {
      when (audioManager.ringerMode) {
        AudioManager.RINGER_MODE_SILENT -> {
          return SilentStatus(status = true, mode = MODE.SILENT)
        }
        AudioManager.RINGER_MODE_VIBRATE -> {
          return SilentStatus(status = true, mode = MODE.VIBRATE)
        }
        AudioManager.RINGER_MODE_NORMAL -> {
          val currentVolume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
          val maxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)

          val volume = (1 - (ln((maxVolume - currentVolume).toDouble()) /
            ln(maxVolume.toDouble())))

          return if (volume > 0) {
            SilentStatus(status = false, mode = MODE.NORMAL)
          } else {
            SilentStatus(status = true, mode = MODE.MUTED)
          }
        }
        else -> return SilentStatus(status = false, mode = MODE.NORMAL)
      }
    }
  }
}
