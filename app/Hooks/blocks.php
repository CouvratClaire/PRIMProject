<?php

namespace App\Hooks;

// Check whether WordPress and ACF are available; bail if not.
if (!function_exists('acf_register_block')) {
    return;
}
if (!function_exists('add_filter')) {
    return;
}
if (!function_exists('add_action')) {
    return;
}

// Add the default blocks location, 'views/blocks', via filter
add_filter('sage-acf-gutenberg-blocks-templates', function () {
    return array('views/blocks');
});

/**
 * Create blocks based on templates found in Sage's "views/blocks" directory
 */
add_action('acf/init', function () {

    // Global $sage_error so we can throw errors in the typical sage manner
    global $sage_error;

    // Get an array of directories containing blocks
    $directories = apply_filters('sage-acf-gutenberg-blocks-templates', []);

    // Check whether ACF exists before continuing
    foreach ($directories as $dir) {
        $template_directory = new \DirectoryIterator(\locate_template($dir));

        foreach ($template_directory as $template) {
            if (!$template->isDot() && !$template->isDir()) {

                // Strip the file extension to get the slug
                $slug = removeBladeExtension($template->getFilename());

                // Get header info from the found template file(s)
                $file_path = locate_template($dir . "/${slug}.blade.php");
                $file_headers = get_file_data($file_path, [
                    'title' => 'Title',
                    'description' => 'Description',
                    'category' => 'Category',
                    'icon' => 'Icon',
                    'keywords' => 'Keywords',
                    'mode' => 'Mode',
                ]);

                if (empty($file_headers['title'])) {
                    $sage_error(__('This block needs a title: ' . $dir . '/' . $template->getFilename(), 'sage'), __('Block title missing', 'sage'));
                }

                if (empty($file_headers['category'])) {
                    $sage_error(__('This block needs a category: ' . $dir . '/' . $template->getFilename(), 'sage'), __('Block category missing', 'sage'));
                }

                // Set up block data for registration
                $data = [
                    'name' => $slug,
                    'title' => $file_headers['title'],
                    'description' => $file_headers['description'],
                    'category' => $file_headers['category'],
                    'icon' => $file_headers['icon'],
                    'mode' => $file_headers['mode'] === "disabled" ? "edit" : $file_headers['mode'],
                    'keywords' => explode(' ', $file_headers['keywords']),
                    'supports' => array(
                        'align' => false,
                        'mode' => $file_headers['mode'] !== "disabled"
                    ),
                    'render_callback'  => __NAMESPACE__ . '\\sage_blocks_callback',
                ];

                // Register the block with ACF
                acf_register_block($data);
            }
        }
    }
});

/**
 * Callback to register blocks
 */
function sage_blocks_callback($block, $content = '', $is_preview = false, $post_id = 0)
{

    // Set up the slug to be useful
    $slug = str_replace('acf/', '', $block['name']);

    // Set up the block data
    $block['slug'] = $slug;
    // $block['classes'] = implode(' ', [$block['slug'], $block['className'], $block['align']]);
    $block['classes'] = implode(' ', [$block['slug'], $block['align']]);

    // Use Sage's template() function to echo the block and populate it with data
    echo \App\template("blocks/${slug}", ['block' => $block, "is_preview" => $is_preview]);
}

/**
 * Function to strip the `.blade.php` from a blade filename
 */
function removeBladeExtension($filename)
{

    // Remove the unwanted extensions
    $return = substr($filename, 0, strrpos($filename, '.blade.php'));

    // Always return
    return $return;
}
