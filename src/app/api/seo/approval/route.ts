import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recommendationId,
      action,
      category,
      oldValue,
      newValue,
      approver = 'Home Storey Admin'
    } = body;

    if (!recommendationId || !action) {
      return NextResponse.json({ error: 'Missing recommendationId or action' }, { status: 400 });
    }

    const auditEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      recommendationId,
      action, // 'approved' | 'rejected' | 'modified' | 'rolled_back'
      category: category || 'general',
      oldValue: oldValue || '',
      newValue: newValue || '',
      approver: approver || 'Admin',
      timestamp: Date.now()
    };

    return NextResponse.json({
      success: true,
      auditEntry,
      message: `Recommendation ${action} successfully.`
    });
  } catch (error: any) {
    console.error('Error processing recommendation approval action:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process approval action' },
      { status: 500 }
    );
  }
}
