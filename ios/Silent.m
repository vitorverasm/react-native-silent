#import "Silent.h"

@implementation Silent

RCT_EXPORT_MODULE()

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_REMAP_METHOD(multiply,
                 multiplyWithA:(nonnull NSNumber*)a withB:(nonnull NSNumber*)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSNumber *result = @([a floatValue] * [b floatValue]);
    
    resolve(result);
}

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_REMAP_METHOD(isEnabled,
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *result = @("true");
    
    resolve(result);
}

@end
