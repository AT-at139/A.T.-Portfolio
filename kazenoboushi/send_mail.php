<?php
// お店側のメールアドレス
$shopMail = "info@at-19006.weblike.jp";

// お客様の情報
$name     = $_POST['name']     ?? '';
$zip      = $_POST['zip']      ?? '';
$address  = $_POST['address']  ?? '';
$tel      = $_POST['tel']      ?? '';
$mail     = $_POST['mail']     ?? '';
$payment  = $_POST['payment']  ?? '';

// 支払い方法を日本語に変換
$paymentText = [
  'credit' => 'クレジットカード',
  'bank'   => '銀行振込',
  'cod'    => '代金引換'
];
$paymentLabel = $paymentText[$payment] ?? $payment;

// 簡単なバリデーション
if (empty($name) || empty($mail)) {
  echo "error";
  exit;
}

// お客様へのメール
$subject_customer = "ご注文ありがとうございます｜旅の帽子";
$message_customer = 
"{$name} 様\n\n".
"この度はご注文いただき、誠にありがとうございます。\n".
"以下の内容でご注文を承りました。\n\n".
"お名前　　　：{$name}\n".
"郵便番号　　：{$zip}\n".
"住所　　　　：{$address}\n".
"電話番号　　：{$tel}\n".
"メール　　　：{$mail}\n".
"お支払い方法：{$paymentLabel}\n\n".
"旅の帽子";

// お店側へのメール
$subject_shop = "【旅の帽子】新しい注文が入りました";
$message_shop =
"新しい注文が入りました。\n\n".
"お名前　　　：{$name}\n".
"郵便番号　　：{$zip}\n".
"住所　　　　：{$address}\n".
"電話番号　　：{$tel}\n".
"メール　　　：{$mail}\n".
"お支払い方法：{$paymentLabel}\n";

// 送信元ヘッダー
$headers = "From: 旅の帽子 <{$shopMail}>\r\n";
$headers .= "Reply-To: {$shopMail}\r\n";

// メール送信
$result1 = mail($mail, $subject_customer, $message_customer, $headers);
$result2 = mail($shopMail, $subject_shop, $message_shop, $headers);

if ($result1 && $result2) {
  echo "success";
} else {
  echo "error";
}
?>