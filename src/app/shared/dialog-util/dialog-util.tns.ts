import * as dialogsModule from 'ui/dialogs';

export function alert(message: string) {
 dialogsModule.alert({
    title: 'Plan4BA',
    okButtonText: 'OK',
    message: message
  });
}
