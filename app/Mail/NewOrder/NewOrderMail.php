<?php

namespace App\Mail\NewOrder;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class NewOrderMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Collection $order, public $attachmentData = [])
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(
                config('mail.from.address'),
                config('mail.from.name')
            ),
            replyTo: [config('mail.reply')],
            subject: config('app.name') . ' - New Order: #' . ($this->order["bookingId"] ?? '')
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.neworder.index',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        $mailAttach = null;
        if ($this->attachmentData != null) {
            foreach ($this->attachmentData as $item) {
                $mailAttach[] = Attachment::fromData(fn() => $item['attach'], $item['name']);
            }
        }
        if ($mailAttach) return $mailAttach;
        return [];
    }
}
