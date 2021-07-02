<?php
	header('Content-type:application/json;charset=utf-8');
	try {
		if (isset($_FILES['file']['error'])) {
			$error = $_FILES['file']['error'];
			if (is_array($error)) {
				throw new RuntimeException('Invalid parameters.');
			}
			switch ($error) {
				case UPLOAD_ERR_OK:
					break;
				case UPLOAD_ERR_NO_FILE:
					throw new RuntimeException('No file sent.');
				case UPLOAD_ERR_INI_SIZE:
				case UPLOAD_ERR_FORM_SIZE:
					throw new RuntimeException('Exceeded filesize limit.');
				default:
				throw new RuntimeException('Unknown errors.');
			}
			if (isset($_FILES['file']['name']) && isset($_FILES['file']['tmp_name'])) {
				$filepath = $_FILES['file']['name'];
				if (!move_uploaded_file($_FILES['file']['tmp_name'], $filepath)) {
					throw new RuntimeException('Failed to move uploaded file.');
				}
				// All good, send the response
				echo json_encode([
					'status' => 'ok',
					'path' => $filepath
				], JSON_PRETTY_PRINT);
			} else {
				throw new RuntimeException('Invalid filepath.');
			}
		} else {
			throw new RuntimeException('Invalid parameters.');
		}
	} catch (RuntimeException $e) {
		// Something went wrong, send the err message as JSON
		http_response_code(400);
		echo json_encode([
			'status' => 'error',
			'message' => $e->getMessage()
		], JSON_PRETTY_PRINT);
	}
?>