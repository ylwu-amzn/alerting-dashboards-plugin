/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import React, { Component } from 'react';
import { Field } from 'formik';
import {
  EuiButton,
  EuiFieldNumber,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSelect,
} from '@elastic/eui';

export const Expressions = { THRESHOLD: 'THRESHOLD' };

const THRESHOLD_ENUM_OPTIONS = [
  { value: 'ABOVE', text: 'IS ABOVE' },
  { value: 'BELOW', text: 'IS BELOW' },
  { value: 'EXACTLY', text: 'IS EXACTLY' },
];

const AND_OR_CONDITION_OPTIONS = [
  { value: 'AND', text: 'AND' },
  { value: 'OR', text: 'OR' },
];

const GUTTER_WIDTH = 16;
const AND_OR_FIELD_WIDTH = 90;
const METRIC_FIELD_WIDTH = 300;
const THRESHOLD_FIELD_WIDTH = 200;
const VALUE_FIELD_WIDTH = 200;

class BucketLevelTriggerExpression extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      arrayHelpers,
      queryMetrics,
      index,
      andOrConditionFieldName,
      queryMetricFieldName,
      enumFieldName,
      valueFieldName,
    } = this.props;
    const isFirstCondition = index === 0;
    return (
      <EuiFlexGroup
        style={{
          maxWidth: 1200,
          paddingLeft: '10px',
          paddingTop: '10px',
          whiteSpace: 'nowrap',
        }}
        gutterSize={'m'}
        alignItems={'flexStart'}
      >
        {!isFirstCondition ? (
          <EuiFlexItem grow={false} style={{ width: `${AND_OR_FIELD_WIDTH}px` }}>
            <Field name={andOrConditionFieldName}>
              {({ field: { onBlur, ...rest }, form: { touched, errors } }) => (
                <EuiFormRow
                  isInvalid={touched.andOrCondition && !!errors.andOrCondition}
                  error={errors.andOrCondition}
                >
                  <EuiSelect options={AND_OR_CONDITION_OPTIONS} {...rest} />
                </EuiFormRow>
              )}
            </Field>
          </EuiFlexItem>
        ) : null}

        <EuiFlexItem
          grow={false}
          style={{
            minWidth: isFirstCondition
              ? `${METRIC_FIELD_WIDTH + AND_OR_FIELD_WIDTH + GUTTER_WIDTH}px`
              : `${METRIC_FIELD_WIDTH}px`,
          }}
        >
          <Field name={queryMetricFieldName} fullWidth={true}>
            {({ field: { onBlur, ...rest }, form: { touched, errors } }) => (
              <EuiFormRow
                fullWidth={true}
                label={isFirstCondition ? 'Metric' : null}
                isInvalid={touched.queryMetric && !!errors.queryMetric}
                error={errors.queryMetric}
              >
                <EuiSelect fullWidth={true} options={queryMetrics} {...rest} />
              </EuiFormRow>
            )}
          </Field>
        </EuiFlexItem>

        <EuiFlexItem grow={false} style={{ width: `${THRESHOLD_FIELD_WIDTH}px` }}>
          <Field name={enumFieldName} fullWidth={true}>
            {({ field: { onBlur, ...rest }, form: { touched, errors } }) => (
              <EuiFormRow
                fullWidth={true}
                label={isFirstCondition ? 'Threshold' : null}
                isInvalid={touched.thresholdEnum && !!errors.thresholdEnum}
                error={errors.thresholdEnum}
              >
                <EuiSelect options={THRESHOLD_ENUM_OPTIONS} {...rest} />
              </EuiFormRow>
            )}
          </Field>
        </EuiFlexItem>

        <EuiFlexItem grow={false} style={{ width: `${VALUE_FIELD_WIDTH}px` }}>
          <Field name={valueFieldName}>
            {({ field, form: { touched, errors } }) => (
              <EuiFormRow
                label={isFirstCondition ? 'Value' : null}
                isInvalid={touched.thresholdValue && !!errors.thresholdValue}
                error={errors.thresholdValue}
              >
                <EuiFieldNumber {...field} />
              </EuiFormRow>
            )}
          </Field>
        </EuiFlexItem>
        {!isFirstCondition ? (
          <EuiFlexItem grow={false}>
            <EuiButton
              color={'danger'}
              onClick={() => {
                arrayHelpers.remove(index);
              }}
            >
              Remove condition
            </EuiButton>
          </EuiFlexItem>
        ) : null}
      </EuiFlexGroup>
    );
  }
}

export default BucketLevelTriggerExpression;
