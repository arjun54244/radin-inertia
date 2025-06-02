->getUploadedFileNameForStorageUsing(function (TemporaryUploadedFile $file) {
                                // Clean the original name to avoid slashes, spaces, etc.
                                $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                                $cleanName = Str::slug($originalName); // Make it URL-safe
                    
                                // Make sure to remove any backslashes
                                $cleanName = str_replace('\\', '', $cleanName);

                                $uniqueFilename = uniqid() . '_' . $cleanName;

                                // Upload to Cloudinary
                                $result = Cloudinary::uploadApi()->upload($file->getRealPath(), [
                                    'folder' => 'blog', // folder is blog
                                    'public_id' => $uniqueFilename, // clean filename (without folder prefix again)
                                    'transformation' => [
                                        'quality' => 'auto',
                                        'fetch_format' => 'auto',
                                    ],
                                ]);

                                return $result['secure_url']; // Return the secure URL for storage
                            })