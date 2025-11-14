import React, { useState } from 'react';
import { Send } from 'lucide-react';
import BasicInfo from './Components/BasicInfo';
import EventDetails from './Components/EventDetails';
import TargetAudience from './Components/TargetAudience';
import Attachment from './Components/Attachment';
import Header from './Components/Header';


export default function EventSubmissionForm() {
    const [submissionType, setSubmissionType] = useState('event');
    const [formData, setFormData] = useState ({
        title: '',
        description: '',
        category: '',
        organizer: '',
        eventDate: '',
        eventTime: '',
        location: '',
        eventLink: '',
        targetAudience: []
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData({...formData, [field]: value });
    };

    const handleAudienceToggle = (audience) => {
        const current = formData.targetAudience;
        if (current.includes(audience)) {
            setFormData ({
                ...formData,
                targetAudience: current.filter(a => a!== audience)
            });
        } else {
            setFormData ({
                    ...formData,
                    targetAudience: [...current, audience]
                });
            }
        };

        const handleSubmit = () => {
            console.log('Form submitted:', {submissionType, ...formData });
            setSubmitted(true);
            setTimeout(() => {
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    organizer: '',
                    eventDate: '',
                    eventTime: '',
                    location: '',
                    eventLink: '',
                    targetAudience: []
                });
                setSubmitted(false);
            }, 3000);
        };

        if (submitted) {
            return (
                <div className="min-h-screen bg-gray-100 items-center justify-center p-6">
                    <div className="bg-white rounded-lg p-16 text-center shadow-md max-w-md">
                        <div className="w-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center text-4xl">
                             ✓
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2"> Submission Sent Successfully! </h2>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed"> Your submission has been sent for admin approval. You'll receive a notification once it's reviewed. </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                            <p className="text-xs text-green-700 font-semibold">  ✓ Check your email for confimation. </p>
                        </div>
                        <p className="text-xs text-gray-500"> Redirecting to dashboard...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gray-100 py-10 px-6">
                <section className="bg-gray-100 py-4 px-6 border-t border-red-600">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */ }
                        <Header submissionType={submissionType} />
                        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                            
                            <BasicInfo 
                            submissionType={submissionType}
                            setSubmissionType={setSubmissionType}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            />
                            
                            {submissionType === 'event' && (
                                <EventDetails formData={formData} handleInputChange={handleInputChange} />
                                )}
                                
                                <TargetAudience formData={formData} handleAudienceToggle={handleAudienceToggle} />
                                
                                <Attachment />
                                
                                <div className="flex gap-3 justify-end pt-8 border-t-2 border-gray-200">
                                    <button 
                                    onClick={() => console.log('Cancel')}
                                    className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-50 transition"
                                    >
                                    Cancel
                                    </button>
                                    <button
                                    onClick={handleSubmit}
                                    className="px-6 py-2.5 bg-red-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-red-700 transition flex items-center gap-2"
                                    >
                                <Send size={16} />
                            Submit for Approval
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
}