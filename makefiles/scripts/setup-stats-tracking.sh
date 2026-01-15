#!/bin/bash
# Setup script for automated stats tracking

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "📊 AIReady Stats Tracking Setup"
echo ""

# Check required tools
echo "Checking required tools..."
command -v jq >/dev/null 2>&1 || { echo "❌ jq not found. Install: brew install jq"; exit 1; }
command -v gh >/dev/null 2>&1 || { echo "❌ gh not found. Install: brew install gh"; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "❌ curl not found (should be pre-installed)"; exit 1; }

echo "✅ All required tools installed"
echo ""

# Create stats directory
mkdir -p "$PROJECT_ROOT/.aiready/stats"
echo "✅ Created .aiready/stats directory"
echo ""

# Export initial baseline
echo "Exporting baseline stats..."
cd "$PROJECT_ROOT" && make stats-export
echo ""

# Setup cron job
echo "Would you like to setup automated weekly stats tracking? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    CRON_CMD="0 9 * * 1 cd $PROJECT_ROOT && make stats-export >> $PROJECT_ROOT/.aiready/stats/cron.log 2>&1"
    
    # Check if cron job already exists
    if crontab -l 2>/dev/null | grep -q "make stats-export"; then
        echo "⚠️  Cron job already exists"
    else
        # Add to crontab
        (crontab -l 2>/dev/null; echo "$CRON_CMD") | crontab -
        echo "✅ Added cron job (runs every Monday at 9am)"
        echo ""
        echo "To view: crontab -l"
        echo "To remove: crontab -e (then delete the line)"
    fi
else
    echo "Skipping cron setup. You can run manually:"
    echo "  make stats-export"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Available commands:"
echo "  make stats          # Show current stats"
echo "  make stats-export   # Export stats to JSON"
echo "  make stats-compare  # Compare with last week"
echo "  make stats-weekly   # Weekly report"
echo ""
echo "See docs/TRACKING-STATS.md for more details"
