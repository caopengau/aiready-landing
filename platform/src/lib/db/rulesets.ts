import { PutCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { doc, getTableName } from './client';
import type { CustomRuleset } from './types';

/**
 * Retrieves the custom ruleset for a team.
 * Returns null if no custom ruleset is defined.
 */
export async function getRuleset(
  teamId: string
): Promise<CustomRuleset | null> {
  const TABLE_NAME = getTableName();
  const result = await doc.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: `TEAM#${teamId}`, SK: 'RULESET#DEFAULT' },
    })
  );
  return result.Item ? (result.Item as CustomRuleset) : null;
}

/**
 * Updates or creates a custom ruleset for a team.
 */
export async function updateRuleset(
  teamId: string,
  ruleset: Partial<CustomRuleset>
): Promise<void> {
  const TABLE_NAME = getTableName();
  const now = new Date().toISOString();

  const existing = await getRuleset(teamId);

  if (!existing) {
    const newItem = {
      id: 'RULESET#DEFAULT',
      teamId,
      overrides: ruleset.overrides || {},
      customPolicies: ruleset.customPolicies || [],
      enforcement: ruleset.enforcement || 'advisory',
      createdAt: now,
      updatedAt: now,
    };

    await doc.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `TEAM#${teamId}`,
          SK: 'RULESET#DEFAULT',
          ...newItem,
        },
      })
    );
    return;
  }

  const updateExpressions: string[] = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(ruleset)) {
    if (key === 'id' || key === 'teamId' || key === 'createdAt') continue;
    updateExpressions.push(`#${key} = :${key}`);
    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = value;
  }

  if (updateExpressions.length === 0) return;
  updateExpressions.push('#updatedAt = :updatedAt');
  expressionAttributeNames['#updatedAt'] = 'updatedAt';
  expressionAttributeValues[':updatedAt'] = now;

  await doc.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: `TEAM#${teamId}`, SK: 'RULESET#DEFAULT' },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    })
  );
}
