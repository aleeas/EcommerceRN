package com.ecommerceapp

import android.os.Handler
import android.os.Looper
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.ReactRootView // Keep only one import of ReactRootView

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "EcommerceApp"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set the splash screen layout
        setContentView(R.layout.splash_screen)

        // Delay for a short time before loading the main React Native app
        // You can adjust the delay time (in milliseconds)
        Handler(Looper.getMainLooper()).postDelayed({
            // Load the main React Native view
            val reactRootView = ReactRootView(this)
            reactRootView.startReactApplication(
                reactNativeHost.reactInstanceManager,
                mainComponentName,
                null
            )
            setContentView(reactRootView)
        }, 3000) // 3000 ms (3 seconds)
    }
}
