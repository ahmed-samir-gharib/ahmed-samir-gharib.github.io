<?php
// Replace this with the email address where you want to receive messages
$receiving_email_address = 'ahmed-samir@outlook.com';

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    if (!$email) {
        echo "Invalid email address.";
        exit;
    }

    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email content
    $email_content = "You have received a new message from your website contact form:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Send the email
    if (mail($receiving_email_address, $subject, $email_content, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "Sorry, your message could not be sent. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>
