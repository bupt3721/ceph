import { Validators } from '@angular/forms';

import { I18n } from '@ngx-translate/i18n-polyfill';

import { SelectBadgesMessages } from '../../../shared/components/select-badges/select-badges-messages.model';
import { SelectBadgesOption } from '../../../shared/components/select-badges/select-badges-option.model';
import { Pool } from '../pool';

export class PoolFormData {
  poolTypes: string[];
  erasureInfo = false;
  crushInfo = false;
  applications: any;

  constructor(i18n: I18n) {
    this.poolTypes = ['erasure', 'replicated'];
    this.applications = {
      selected: [],
      available: [
        new SelectBadgesOption(false, 'cephfs', ''),
        new SelectBadgesOption(false, 'rbd', ''),
        new SelectBadgesOption(false, 'rgw', '')
      ],
      validators: [Validators.pattern('[A-Za-z0-9_]+'), Validators.maxLength(128)],
      messages: new SelectBadgesMessages(
        {
          empty: i18n('No applications added'),
          selectionLimit: {
            text: i18n('Applications limit reached'),
            tooltip: i18n('A pool can only have up to four applications definitions.')
          },
          customValidations: {
            pattern: i18n(`Allowed characters '_a-zA-Z0-9'`),
            maxlength: i18n('Maximum length is 128 characters')
          },
          filter: i18n('Filter or add applications'),
          add: i18n('Add application')
        },
        i18n
      )
    };
  }

  pgs = 1;
  pool: Pool; // Only available during edit mode
}
