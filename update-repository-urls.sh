#!/bin/bash

###############################################################################
# Update Repository URLs Script
# Updates all repository URLs to new private repository
###############################################################################

echo "======================================"
echo "  Update Repository URLs"
echo "======================================"
echo ""

# Get new repository URL from user
read -p "Enter your new repository (e.g., YOUR_USERNAME/duxxai-code): " NEW_REPO

if [ -z "$NEW_REPO" ]; then
    echo "Error: Repository name is required"
    exit 1
fi

OLD_REPO="bankyresearch/duxx_ai"
NEW_REPO_URL="https://github.com/$NEW_REPO"

echo ""
echo "Updating from: $OLD_REPO"
echo "Updating to: $NEW_REPO"
echo ""

# Update product.json
echo "Updating product.json..."
sed -i.bak "s|bankyresearch/duxx_ai|$NEW_REPO|g" product.json

# Update README files
echo "Updating README files..."
sed -i.bak "s|bankyresearch/duxx_ai|$NEW_REPO|g" README_STANDALONE.md
sed -i.bak "s|bankyresearch/duxx_ai|$NEW_REPO|g" COMPLETE_TRANSFORMATION_SUMMARY.md
sed -i.bak "s|bankyresearch/duxx_ai|$NEW_REPO|g" BUILD_AND_DISTRIBUTE.md

# Update documentation
echo "Updating documentation..."
sed -i.bak "s|bankyresearch/duxx_ai|$NEW_REPO|g" AGENTIC_CHAT_SYSTEM.md
sed -i.bak "s|bankyresearch/duxx_ai|$NEW_REPO|g" QUICKSTART_AGENTS.md

# Update landing page
echo "Updating landing page..."
sed -i.bak "s|bankyresearch/duxx_ai|$NEW_REPO|g" LANDING_PAGE.html

# Update build package.json
if [ -f "build/package.json" ]; then
    echo "Updating build/package.json..."
    sed -i.bak "s|bankyresearch/duxx_ai|$NEW_REPO|g" build/package.json
fi

# Remove backup files
find . -name "*.bak" -type f -delete

echo ""
echo "✅ Repository URLs updated!"
echo ""
echo "Updated files:"
echo "  - product.json"
echo "  - README_STANDALONE.md"
echo "  - COMPLETE_TRANSFORMATION_SUMMARY.md"
echo "  - BUILD_AND_DISTRIBUTE.md"
echo "  - AGENTIC_CHAT_SYSTEM.md"
echo "  - QUICKSTART_AGENTS.md"
echo "  - LANDING_PAGE.html"
echo "  - build/package.json"
echo ""
echo "Next steps:"
echo "  1. Review the changes: git diff"
echo "  2. Commit: git add -A && git commit -m 'Update repository URLs'"
echo "  3. Push: git push"
echo ""

